"""Shared helpers for the thermoacoustic toy model."""
import math

SPEED_OF_SOUND = 343.0  # m/s
DUCT_LENGTH = 1.0       # m
DAMPING = 0.05          # 1/s


def mode_frequency(n: int, c: float = SPEED_OF_SOUND, length: float = DUCT_LENGTH) -> float:
    """Frequency (Hz) of acoustic mode n in a closed-open duct."""
    return n * c / (2 * length)


def growth_rate_model(f: float, tau: float, Q: float = 1.0, zeta: float = DAMPING) -> float:
    """Toy Rayleigh-type growth rate: unstable when positive."""
    return Q * math.cos(2 * math.pi * f * tau) - zeta
