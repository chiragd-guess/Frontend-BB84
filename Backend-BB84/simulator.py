"""
===========================================================
simulator.py
-----------------------------------------------------------

Main BB84 Simulation Engine

This file orchestrates the entire BB84 protocol and
returns a frontend-ready response.

===========================================================
"""

import time
import uuid
from datetime import datetime

import config

from alice import Alice
from bob import Bob
from channel import QuantumChannel
from detector import Detector
from eve import Eve

from qkd import (
    sift_key,
    calculate_qber,
    error_correction,
    privacy_amplification
)
from encryption import xor_encrypt, xor_decrypt


class BB84Simulator:

    ########################################################

    def __init__(self):

        pass

    ########################################################
    # FIX: input validation, extracted into its own method.
    # Bad input (negative photon counts, out-of-range
    # probabilities, etc.) used to travel straight into the
    # simulation and either crash it or produce nonsense
    # results. Now we catch it up front with a clear message.
    ########################################################

    def _validate_inputs(
        self,
        number_of_photons,
        channel_noise,
        photon_loss,
        detector_efficiency,
        dark_count_rate,
        eve_interception
    ):

        errors = []

        if not isinstance(number_of_photons, int) or number_of_photons <= 0:
            errors.append("number_of_photons must be a positive integer")

        if isinstance(number_of_photons, int) and number_of_photons > 100000:
            errors.append("number_of_photons is too large (max 100000)")

        for name, value in [
            ("channel_noise", channel_noise),
            ("photon_loss", photon_loss),
            ("detector_efficiency", detector_efficiency),
            ("dark_count_rate", dark_count_rate),
            ("eve_interception", eve_interception),
        ]:
            if not isinstance(value, (int, float)):
                errors.append(f"{name} must be a number")
            elif not (0 <= value <= 1):
                errors.append(f"{name} must be between 0 and 1 (got {value})")

        return errors

    ########################################################

    def run(

        self,

        number_of_photons,

        channel_noise,

        photon_loss,

        detector_efficiency,

        dark_count_rate,

        eve_interception,

        message=None

    ):

        ####################################################
        # FIX: validate before doing any work at all
        ####################################################

        validation_errors = self._validate_inputs(
            number_of_photons,
            channel_noise,
            photon_loss,
            detector_efficiency,
            dark_count_rate,
            eve_interception
        )

        if validation_errors:
            return {
                "success": False,
                "error": "Invalid input",
                "details": validation_errors
            }

        ####################################################
        # FIX: wrap the whole simulation so any unexpected
        # failure (in this file OR in alice.py / bob.py /
        # channel.py / detector.py / eve.py / qkd.py /
        # encryption.py) comes back as a clean error instead
        # of a raw 500 crash with no explanation.
        ####################################################

        try:
            return self._run_simulation(
                number_of_photons,
                channel_noise,
                photon_loss,
                detector_efficiency,
                dark_count_rate,
                eve_interception,
                message
            )

        except Exception as exc:
            return {
                "success": False,
                "error": "Simulation failed",
                "details": str(exc)
            }

    ########################################################
    # The original simulation logic, unchanged, just moved
    # into its own method so it can be wrapped in try/except
    # above without one giant indented block.
    ########################################################

    def _run_simulation(

        self,

        number_of_photons,

        channel_noise,

        photon_loss,

        detector_efficiency,

        dark_count_rate,

        eve_interception,

        message=None

    ):

        ####################################################
        # TIMER
        ####################################################

        simulation_start = time.time()

        start_datetime = datetime.now()

        ####################################################
        # UPDATE CONFIGURATION
        #
        # ****** IMPORTANT — NOT FULLY FIXED ******
        # `config` is a shared module-level object: there is
        # only ONE copy for your entire running backend. If
        # two users call run() at close to the same time,
        # one user's settings can overwrite the other's
        # mid-calculation, corrupting both results. This is
        # very likely why the backend "acts weird" under real
        # traffic even if it looks fine when you test it
        # alone.
        #
        # The real fix is to stop having Alice/Bob/Channel/
        # Detector/Eve read from the global `config` module,
        # and instead pass these values directly into their
        # constructors/methods, e.g. QuantumChannel(noise=...,
        # loss=...) instead of QuantumChannel() reading
        # config.CHANNEL_NOISE internally.
        # I can make that change too, but it means editing
        # alice.py, bob.py, channel.py, detector.py, eve.py,
        # and config.py — send those over and I'll do it.
        ####################################################

        config.CHANNEL_NOISE = channel_noise

        config.PHOTON_LOSS = photon_loss

        config.DETECTOR_EFFICIENCY = detector_efficiency

        config.DARK_COUNT_RATE = dark_count_rate

        config.EVE_INTERCEPTION = eve_interception

        ####################################################
        # CREATE COMPONENTS
        ####################################################

        alice = Alice(number_of_photons)

        channel = QuantumChannel()

        eve = Eve(number_of_photons)

        detector = Detector()

        bob = Bob(number_of_photons)

        ####################################################
        # TIMELINE
        ####################################################

        timeline = []

        timeline.append({

            "stage": "Preparing Photons",

            "status": "completed"

        })

        ####################################################
        # CHANNEL
        ####################################################

        photons = channel.transmit(

            alice.photons

        )

        timeline.append({

            "stage": "Quantum Transmission",

            "status": "completed"

        })

        ####################################################
        # EVE
        ####################################################

        photons = eve.intercept(

            photons

        )

        timeline.append({

            "stage": "Eve Interception",

            "status": "completed"

        })

        ####################################################
        # DETECTOR
        ####################################################

        photons = detector.detect(

            photons

        )

        timeline.append({

            "stage": "Photon Detection",

            "status": "completed"

        })

        ####################################################
        # BOB
        ####################################################

        bob.measure_photons(

            photons

        )

        timeline.append({

            "stage": "Bob Measurement",

            "status": "completed"

        })

        ####################################################
        # SIFTING
        ####################################################

        sift = sift_key(

            alice.bits,

            bob.bits,

            alice.bases,

            bob.bases

        )

        alice_key = sift["alice_key"]

        bob_key = sift["bob_key"]

        matching_positions = sift["matching_positions"]

        discarded_positions = sift["discarded_positions"]

        timeline.append({

            "stage": "Basis Comparison",

            "status": "completed"

        })

        ####################################################
        # MARK PHOTONS
        #
        # FIX: guard against index-out-of-range in case an
        # earlier stage (transmit / intercept / detect) drops
        # photons from the list instead of just marking them
        # lost. Without this, a single misaligned index used
        # to crash the whole request.
        ####################################################

        for index in matching_positions:

            if index < len(photons):

                photons[index].matching_basis = True

                photons[index].kept_after_sifting = True

        ####################################################
        # QBER
        ####################################################

        qber_results = calculate_qber(

            alice_key,

            bob_key

        )

        qber = qber_results["qber"]

        error_positions = qber_results["error_positions"]

        errors = qber_results["errors"]

        timeline.append({

            "stage": "QBER Estimation",

            "status": "completed"

        })

        ####################################################
        # ERROR CORRECTION
        ####################################################

        correction = error_correction(

            alice_key,

            bob_key

        )

        corrected_key = correction["corrected_key"]

        corrected_errors = correction["corrected_errors"]

        corrected_positions = correction["corrected_positions"]

        timeline.append({

            "stage": "Error Correction",

            "status": "completed"

        })

        ####################################################
        # MARK CORRECTED PHOTONS
        ####################################################

        for position in corrected_positions:

            if position < len(matching_positions):

                photon_index = matching_positions[position]

                if photon_index < len(photons):

                    photons[photon_index].corrected = True

        ####################################################
        # PRIVACY AMPLIFICATION
        ####################################################

        if qber < config.QBER_THRESHOLD:

            privacy = privacy_amplification(
                corrected_key
            )

            final_key = privacy["final_key"]
            final_key_length = privacy["final_key_length"]

        else:

            final_key = ""
            final_key_length = 0

        timeline.append({

            "stage": "Privacy Amplification",

            "status": "completed"

        })

        ####################################################
        # SESSION
        ####################################################

        execution_time = round(

            time.time() - simulation_start,

            4

        )

        secure = qber < config.QBER_THRESHOLD

        ####################################################
        # PHOTON HISTORY
        ####################################################

        photon_history = [

            photon.to_dict()

            for photon in photons

        ]

        ####################################################
        # SESSION INFO
        ####################################################

        session = {

            "session_id": str(uuid.uuid4())[:8].upper(),

            "protocol": "BB84",

            "status": (

                "Secure"

                if secure

                else "Aborted"

            ),

            "start_time": start_datetime.strftime(

                "%H:%M:%S"

            ),

            "duration": execution_time

        }

        ####################################################
        # CONTROLS
        ####################################################

        controls = {

            "number_of_photons": number_of_photons,

            "channel_noise": channel_noise,

            "photon_loss": photon_loss,

            "detector_efficiency": detector_efficiency,

            "dark_count_rate": dark_count_rate,

            "eve_interception": eve_interception

        }

        ####################################################
        # STATISTICS
        ####################################################

        statistics = {

            "photons_sent":

                channel.total_sent,

            "photons_received":

                channel.total_received,

            "photons_lost":

                channel.total_lost,

            "noise_events":

                channel.total_noisy,

            "noise_rate":

                channel.noise_rate,


            "detector_missed":

                detector.missed,

            "dark_counts":

                detector.dark_counts,

            "eve_intercepted":

                eve.intercepted,

            "interception_rate":

                eve.interception_rate,

            "matching_bases":

                len(matching_positions),

            "discarded_bits":

                len(discarded_positions),

            "errors":

                errors,

            "errors_corrected":

                corrected_errors,

            "qber":

                round(

                    qber * 100,

                    2

                ),

            "final_key_length":

                final_key_length

        }

        ####################################################
        # SECURITY
        ####################################################

        security = {

            "secure": secure,

            "eve_detected":

                not secure,

            "qber":

                round(

                    qber * 100,

                    2

                ),

            "threshold":

                config.QBER_THRESHOLD * 100

        }

        ####################################################
        # ALICE
        ####################################################

        alice_data = {

            "bits":

                alice.bits,

            "bases":

                alice.bases,

            "photons":

                len(

                    alice.photons

                )

        }

        ####################################################
        # BOB
        ####################################################

        bob_data = {

            "bases":

                bob.bases,

            "bits":

                bob.bits,

            "statistics":

                bob.get_statistics()

        }

        ####################################################
        # EVE
        ####################################################

        eve_data = {

            "enabled":

                eve_interception > 0,

            "statistics":

                eve.get_statistics()

        }

        ####################################################
        # KEYS
        ####################################################

        keys = {

            "alice_key":

                alice_key,

            "bob_key":

                bob_key,

            "corrected_key":

                corrected_key,

            "final_key":

                final_key

        }

        ####################################################
        # MESSAGE ENCRYPTION
        ####################################################

        encryption = {

            "plaintext": None,

            "ciphertext": None,

            "decrypted": None

        }

        if final_key and message:

            ciphertext = xor_encrypt(

                message,

                final_key

            )

            decrypted = xor_decrypt(

                ciphertext,

                final_key

            )

            encryption = {

                "plaintext": message,

                "ciphertext": ciphertext,

                "decrypted": decrypted

            }

        ####################################################
        # ANALYTICS
        ####################################################

        analytics = {

            "channel": channel.get_statistics(),

            "detector": detector.get_statistics(),

            "eve": eve.get_statistics(),

            "bob": bob.get_statistics(),

            "timeline": timeline,

            "photon_history": photon_history

        }

        ####################################################
        # PERFORMANCE
        ####################################################

        performance = {

            "execution_time": execution_time,

            "photons_per_second": round(

                number_of_photons / execution_time,

                2

            ) if execution_time > 0 else 0

        }

        ####################################################
        # FINAL RESPONSE
        ####################################################

        results = {

            "success": True,

            "session": session,

            "controls": controls,

            "statistics": statistics,

            "security": security,

            "analytics": analytics,

            "alice": alice_data,

            "bob": bob_data,

            "eve": eve_data,

            "keys": keys,

            "encryption": encryption,

            "performance": performance

        }

        return results