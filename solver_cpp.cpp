// Toy Rayleigh-type growth-rate solver for thermoacoustic instability.
// Build: g++ -O2 -std=c++17 solver.cpp -o solver
// Run:   ./solver > sweep.csv
//
// sigma(f, tau, Q) = Q * cos(2*pi*f*tau) - zeta
// Acoustic modes of a closed-open duct: f_n = n * c / (2 * L)

#include <cmath>
#include <iomanip>
#include <iostream>
#include <vector>

struct Params {
    double c = 343.0;      // speed of sound (m/s)
    double L = 1.0;        // duct length (m)
    double zeta = 0.05;    // acoustic damping (1/s)
};

double modeFrequency(int n, const Params& p) {
    return n * p.c / (2.0 * p.L);
}

double growthRate(double f, double tau, double Q, const Params& p) {
    constexpr double kPi = 3.14159265358979323846;
    return Q * std::cos(2.0 * kPi * f * tau) - p.zeta;
}

int main() {
    const Params p;
    const int modes = 4;
    const int steps = 200;
    const std::vector<double> Qs = {0.5, 1.0, 1.5};
    const double tauMax = 0.02;

    std::cout << std::fixed << std::setprecision(6);
    std::cout << "mode,freq_Hz,Q,tau_s,sigma\n";

    for (int n = 1; n <= modes; ++n) {
        const double f = modeFrequency(n, p);
        for (double Q : Qs) {
            for (int k = 0; k < steps; ++k) {
                const double tau = tauMax * k / (steps - 1);
                std::cout << n << ',' << f << ',' << Q << ',' << tau << ','
                          << growthRate(f, tau, Q, p) << '\n';
            }
        }
    }
    return 0;
}
