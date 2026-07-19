"""
===========================================================
qkd.py
-----------------------------------------------------------

This file contains helper functions for the BB84 protocol.

===========================================================
"""
import hashlib

def sift_key(alice_bits,
             bob_bits,
             alice_bases,
             bob_bases):
    """
    Keep only positions where Alice and Bob used
    the same basis.

    Returns

    sifted_alice

    sifted_bob
    """

    sifted_alice = []

    sifted_bob = []

    matching_positions = []

    ##################################################

    for i in range(len(alice_bits)):

        # Skip lost photons.

        if bob_bits[i] is None:

            continue

        # Bases match.

        if alice_bases[i] == bob_bases[i]:

            sifted_alice.append(alice_bits[i])

            sifted_bob.append(bob_bits[i])

            matching_positions.append(i)

    return sifted_alice, sifted_bob, matching_positions


##########################################################


def calculate_qber(alice_key,
                   bob_key):
    """
    Quantum Bit Error Rate

    QBER

    Number of wrong bits

    --------------------

    Total compared bits
    """

    if len(alice_key) == 0:

        return 0

    errors = 0

    ##################################################

    for a, b in zip(alice_key, bob_key):

        if a != b:

            errors += 1

    ##################################################

    qber = errors / len(alice_key)

    return qber

    ##########################################################
#
# Simplified Error Correction
#
##########################################################

def error_correction(alice_key, bob_key):
    """
    Perform a simplified error correction.

    Whenever Bob's bit differs from Alice's bit,
    Bob's bit is corrected.

    Returns

    corrected_key

    number_of_corrected_errors
    """

    corrected_key = []

    corrected_errors = 0

    ##################################################

    for alice_bit, bob_bit in zip(alice_key, bob_key):

        # If the bits already match,
        # keep Bob's bit.

        if alice_bit == bob_bit:

            corrected_key.append(bob_bit)

        else:

            # Correct Bob's bit.

            corrected_key.append(alice_bit)

            corrected_errors += 1

    ##################################################

    return corrected_key, corrected_errors

    ##########################################################
#
# Privacy Amplification
#
##########################################################

def privacy_amplification(corrected_key):
    """
    Perform privacy amplification using SHA-256.

    Parameters
    ----------
    corrected_key : list

    Returns
    -------
    final_key : str
    """

    ##################################################

    # Convert list into a binary string.

    binary_string = ""

    for bit in corrected_key:

        binary_string += str(bit)

    ##################################################

    # Hash the binary string.

    hashed = hashlib.sha256(

        binary_string.encode()

    ).hexdigest()

    ##################################################

    # Convert hexadecimal hash into binary.

    binary_hash = bin(

        int(hashed, 16)

    )[2:]

    ##################################################

    # Keep only as many bits as the corrected key length.

    final_key = binary_hash[:len(corrected_key)]

    return final_key