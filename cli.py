"""Command-line entry point: print growth rates for a list of frequencies."""
import argparse
from thermo_utils import growth_rate_model, mode_frequency


def main() -> None:
    parser = argparse.ArgumentParser(description="Toy thermoacoustic growth-rate calculator")
    parser.add_argument("--mode", type=int, default=1, help="acoustic mode number")
    parser.add_argument("--tau", type=float, default=0.003, help="time delay (s)")
    parser.add_argument("--Q", type=float, default=1.0, help="heat-release strength")
    args = parser.parse_args()
    f = mode_frequency(args.mode)
    sigma = growth_rate_model(f, args.tau, args.Q)
    status = "UNSTABLE" if sigma > 0 else "stable"
    print(f"mode={args.mode} f={f:.1f} Hz tau={args.tau} s Q={args.Q} sigma={sigma:.4f} ({status})")


if __name__ == "__main__":
    main()
