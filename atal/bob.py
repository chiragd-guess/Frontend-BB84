"""
===========================================================
bob.py
-----------------------------------------------------------
This file contains the Bob class.

Bob is the receiver in the BB84 protocol.

Bob DOES NOT know:

• Alice's secret bits
• Alice's bases

Bob only receives photons and measures them using his own
randomly chosen bases.

Later, the quantum channel will deliver photons to Bob.
===========================================================
"""

# Import helper functions.
from utils import generate_random_bases


class Bob:

    """
    --------------------------------------------------------
    Bob Class

    Bob randomly chooses measurement bases.

    Then he measures each received photon.

    At this stage we assume a perfect quantum channel.
    Noise and photon loss will be added later.
    --------------------------------------------------------
    """

    def __init__(self, number_of_photons):

        # Save number of photons.
        self.number_of_photons = number_of_photons

        # Bob randomly chooses measurement bases.
        self.bases = generate_random_bases(number_of_photons)

        # Bob's measured bits.
        self.bits = []

    def measure_photons(self, photons):

        """
        Measure every received photon.

        Parameters
        ----------
        photons : list
            List of photons received from Alice.
        """

        # Start with an empty list.
        self.bits = []

        # Look at each photon and Bob's chosen basis.
        for photon, basis in zip(photons, self.bases):

            # Photon arrived, Bob is now measuring it.
            photon.measured = True
            if photon.lost:    

                self.bits.append(None)

                continue

            # -------------------------------
            # Rectilinear Basis (+)
            # -------------------------------
            if basis == "+":

                if photon.state == "H":
                    self.bits.append(0)

                elif photon.state == "V":
                    self.bits.append(1)

                # Wrong basis.
                # Bob gets a random result.
                elif photon.state in ["D","A"]:

                    import random

                    self.bits.append(random.randint(0, 1))

            # -------------------------------
            # Diagonal Basis (x)
            # -------------------------------
            else:

                if photon.state == "D":
                    self.bits.append(0)

                elif photon.state == "A":
                    self.bits.append(1)

                # Wrong basis.
                # Random result.
                elif photon.state in ["H","V"]:

                    import random

                    self.bits.append(random.randint(0, 1))

    def display_information(self):

        """
        Display Bob's information.
        """

        print("\n" + "=" * 60)
        print("BOB")
        print("=" * 60)

        print("\nMeasurement Bases")

        print(self.bases)

        print("\nMeasured Bits")

        print(self.bits)