"""
===========================================================
photon.py
-----------------------------------------------------------

This file defines the Photon class.

Instead of representing photons as simple strings
like

"H"

or

"V"

we create real Photon objects.

This lets every photon remember what has happened
to it while travelling through the quantum channel.
===========================================================
"""


class Photon:

    """
    -------------------------------------------------------

    Photon Object

    Every photon remembers

    • Polarization state

    • Was it lost?

    • Was it affected by noise?

    • Was it intercepted by Eve?

    • Was it measured by Bob?

    -------------------------------------------------------
    """

    def __init__(self, state):

        """
        Create a new photon.

        Parameters

        ----------
        state : str

            One of

            H
            V
            D
            A
        """

        # Current polarization state.

        self.state = state

        # Has the photon been lost?

        self.lost = False

        # Was noise applied?

        self.noisy = False

        # Did Eve intercept it?

        self.intercepted = False

        # Has Bob measured it?

        self.measured = False

    ########################################################

    def __str__(self):
        """
        Used when printing a single Photon.
        """
        return self.state


    def __repr__(self):
        """
        Used when printing a list of Photons.
        """
        return self.state