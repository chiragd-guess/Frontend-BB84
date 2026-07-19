"""
===========================================================
channel.py
-----------------------------------------------------------

This file contains the QuantumChannel class.

The quantum channel represents the medium through which
photons travel from Alice to Bob.

Examples

• Optical Fiber
• Free Space
• Satellite Link

During transmission several things may happen.

1. Photon arrives safely.

2. Photon is lost.

3. Photon is affected by noise.

===========================================================
"""

import random

import config


class QuantumChannel:

    """
    Represents the quantum communication channel.
    """

    def __init__(self):

        # Statistics

        self.total_sent = 0

        self.total_received = 0

        self.total_lost = 0

        self.total_noisy = 0

    ########################################################

    def apply_noise(self, photon):

        """
        Apply channel noise to a photon.

        Noise flips the polarization.
        """

        if photon.state == "H":

            photon.state = "V"

        elif photon.state == "V":

            photon.state = "H"

        elif photon.state == "D":

            photon.state = "A"

        elif photon.state == "A":

            photon.state = "D"

    # Remember that noise happened.

        photon.noisy = True


    ########################################################

    def transmit(self, photons):

        """
        Send photons through the quantum channel.

        Returns

        List of photons received by Bob.
        """

        received = []

        # Reset statistics every transmission.

        self.total_sent = len(photons)

        self.total_received = 0

        self.total_lost = 0

        self.total_noisy = 0

        ####################################################

        for photon in photons:

            ################################################
            # STEP 1
            # Photon Loss
            ################################################

            if random.random() < config.PHOTON_LOSS:

                photon.lost = True

                received.append(photon)

                self.total_lost += 1

                continue

            ################################################
            # STEP 2
            # Channel Noise
            ################################################

            if random.random() < config.CHANNEL_NOISE:

                self.apply_noise(photon)

                self.total_noisy += 1

            ################################################
            # STEP 3
            # Photon reaches Bob
            ################################################

            received.append(photon)

            self.total_received += 1

        return received

    ########################################################

    def display_statistics(self):

        """
        Print channel statistics.
        """

        print("\n" + "=" * 60)

        print("QUANTUM CHANNEL")

        print("=" * 60)

        print()

        print(f"Photons Sent      : {self.total_sent}")

        print(f"Photons Received  : {self.total_received}")

        print(f"Photons Lost      : {self.total_lost}")

        print(f"Noise Applied     : {self.total_noisy}")