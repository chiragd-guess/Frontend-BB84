"""
===========================================================
utils.py
-----------------------------------------------------------
This file contains helper functions used throughout
the BB84 simulator.

===========================================================
"""
from photon import Photon
# Import Python's random module.
# We use it to generate random bits and random bases.
import random


# =========================================================
# generate_random_bits()
#
# Generates a list containing random 0s and 1s.
#
# Example
#
# Input
# 5
#
# Output
# [1,0,0,1,1]
# =========================================================
def generate_random_bits(number_of_bits):

    # Empty list that will store the bits.
    bits = []

    # Repeat until enough bits are generated.
    for _ in range(number_of_bits):

        # Append either 0 or 1 randomly.
        bits.append(random.randint(0, 1))

    # Return the completed list.
    return bits


# =========================================================
# generate_random_bases()
#
# Generates random measurement bases.
#
# We use:
#
# '+'  Rectilinear basis
#
# 'x'  Diagonal basis
#
# Example
#
# ['+','x','+','+','x']
# =========================================================
def generate_random_bases(number_of_bases):

    bases = []

    for _ in range(number_of_bases):

        bases.append(random.choice(["+", "x"]))

    return bases


# =========================================================
# encode_photon()
#
# Converts a bit and basis into a polarization state.
#
# Rectilinear (+)
#
# 0 -> Horizontal (H)
#
# 1 -> Vertical (V)
#
# Diagonal (x)
#
# 0 -> 45°
#
# 1 -> 135°
#
# We represent photons using strings because they are
# easy to understand.
# =========================================================
def encode_photon(bit, basis):


    if basis == "+":

        if bit == 0:
            return Photon("H")

        return Photon("V")

    else:

        if bit == 0:
            return Photon("D")

        return Photon("A")

    

# =========================================================
# print_title()
#
# Prints a nice project heading.
# =========================================================
def print_title():

    print("=" * 60)
    print("      BB84 QUANTUM KEY DISTRIBUTION SIMULATOR")
    print("=" * 60)