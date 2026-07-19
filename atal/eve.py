"""
===========================================================
eve.py
-----------------------------------------------------------

This file contains the Eve class.

Eve is the eavesdropper.

She performs an Intercept-Resend attack.

Steps

1. Randomly decides whether to intercept a photon.

2. Chooses a random basis.

3. Measures the photon.

4. Sends a photon to Bob.

Because Eve does not know Alice's basis,
she sometimes measures using the wrong basis.

This introduces errors that Alice and Bob
can later detect using the QBER.
===========================================================
"""

import random

import config

from utils import generate_random_bases
from photon import Photon


class Eve:

    def __init__(self, number_of_photons):

        self.number_of_photons = number_of_photons

        self.bases = generate_random_bases(number_of_photons)

        self.intercepted = 0

    ########################################################

    def intercept(self, photons):

        """
        Perform an intercept-resend attack.
        """

        new_photons = []

        self.intercepted = 0

        for photon, eve_basis in zip(photons, self.bases):

            # Lost photons cannot be intercepted.
            if photon.lost:

                new_photons.append(photon)

                continue

            ################################################

            if random.random() > config.EVE_INTERCEPTION:

                new_photons.append(photon)

                continue

            ################################################

            self.intercepted += 1

            photon.intercepted = True

            ################################################
            # Eve measures the photon.
            ################################################

            state = photon.state

            if eve_basis == "+":

                if state in ["H", "V"]:

                    measured = state

                else:

                    measured = random.choice(["H", "V"])

            else:

                if state in ["D", "A"]:

                    measured = state

                else:

                    measured = random.choice(["D", "A"])

            ################################################
            # Eve sends a NEW photon.
            ################################################

            new_photon = Photon(measured)

            new_photon.intercepted = True

            new_photons.append(new_photon)

        return new_photons

    ########################################################

    def display_statistics(self):

        print("\n" + "=" * 60)

        print("EVE")

        print("=" * 60)

        print()

        print(f"Intercepted Photons : {self.intercepted}")