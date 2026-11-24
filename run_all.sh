#!/usr/bin/env bash
# Build and run every native solver, then compare their outputs.
# Usage: bash run_all.sh   (run from the project folder)
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BUILD="$(mktemp -d)"
trap 'rm -rf "$BUILD"' EXIT

echo "[1/4] Building C solver"
gcc -O2 -std=c99 -Wall "$ROOT/solver_c.c" -o "$BUILD/c_solver" -lm
"$BUILD/c_solver" > "$ROOT/sweep_c.csv"

echo "[2/4] Building C++ solver"
g++ -O2 -std=c++17 "$ROOT/solver_cpp.cpp" -o "$BUILD/cpp_solver"
"$BUILD/cpp_solver" > "$ROOT/sweep_cpp.csv"

echo "[3/4] Running .NET solver (if dotnet is installed)"
if command -v dotnet >/dev/null 2>&1; then
    dotnet run --project "$ROOT/ThermoCalc.csproj" > "$ROOT/sweep_dotnet.csv"
else
    echo "  dotnet not found, skipping"
fi

echo "[4/4] Comparing outputs"
for f in "$ROOT"/sweep_*.csv; do
    echo "  $(basename "$f"): $(($(wc -l < "$f") - 1)) rows"
done
if cmp -s "$ROOT/sweep_c.csv" "$ROOT/sweep_cpp.csv"; then
    echo "  C and C++ outputs are identical"
else
    echo "  C and C++ outputs differ"
    exit 1
fi
echo "Done. Results are in sweep_*.csv."
