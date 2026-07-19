"""
===========================================
Simple test for the BB84 Simulation Engine
===========================================
"""

import config

from simulator import BB84Simulator


simulator = BB84Simulator()

results = simulator.run(

    number_of_photons=1000,

    channel_noise=0.05,

    photon_loss=0.10,

    detector_efficiency=0.90,

    dark_count_rate=0.01,

    eve_interception=0.25

)

print()

print("=" * 60)

print("BB84 SIMULATION RESULTS")

print("=" * 60)

for key, value in results.items():

    print(f"{key:25}: {value}")