"""
===========================================================
detector.py
-----------------------------------------------------------

This file contains the Detector class.

The detector represents Bob's physical photon detector.

A detector is not perfect.

Sometimes

• It misses arriving photons.

• It falsely reports a photon
  (dark count).

The detector decides whether Bob actually receives
a usable photon.
===========================================================
"""

import random

import config


class Detector:

    """
    Simulates Bob's detector.
    """

    def __init__(self):

        # Statistics

        self.detected = 0

        self.missed = 0

        self.dark_counts = 0

    ########################################################

    def detect(self, photons):

        """
        Simulate the detector.

        Parameters

        ----------
        photons : list

        Returns

        -------
        list
        """

        detected_photons = []

        # Reset statistics.

        self.detected = 0

        self.missed = 0

        self.dark_counts = 0

        ####################################################

        for photon in photons:

            # Already lost in channel.

            if photon.lost:

                detected_photons.append(photon)

                continue

            ################################################
            # Detector Efficiency
            ################################################

            if random.random() > config.DETECTOR_EFFICIENCY:

                photon.lost = True

                self.missed += 1

                detected_photons.append(photon)

                continue

            ################################################
            # Dark Counts
            ################################################

            if random.random() < config.DARK_COUNT_RATE:

                photon.noisy = True

                self.dark_counts += 1

            ################################################

            self.detected += 1

            detected_photons.append(photon)

        return detected_photons

    ########################################################

    def display_statistics(self):

        print("\n" + "=" * 60)

        print("DETECTOR")

        print("=" * 60)

        print()

        print(f"Detected Photons : {self.detected}")

        print(f"Missed Photons   : {self.missed}")

        print(f"Dark Counts      : {self.dark_counts}")
        