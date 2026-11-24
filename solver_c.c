/* Toy Rayleigh-type growth-rate solver in plain C (C99).
 * Build: gcc -O2 -std=c99 c/solver.c -o c/solver -lm
 * Run:   ./c/solver > c/sweep_c.csv
 * sigma(f, tau, Q) = Q * cos(2*pi*f*tau) - zeta
 */
#include <math.h>
#include <stdio.h>

#define SPEED_OF_SOUND 343.0
#define DUCT_LENGTH 1.0
#define DAMPING 0.05
#define PI 3.14159265358979323846
#define MODES 4
#define STEPS 200

static double mode_frequency(int n) {
    return n * SPEED_OF_SOUND / (2.0 * DUCT_LENGTH);
}

static double growth_rate(double f, double tau, double Q) {
    return Q * cos(2.0 * PI * f * tau) - DAMPING;
}

int main(void) {
    const double Qs[] = {0.5, 1.0, 1.5};
    const int nQ = 3;
    const double tau_max = 0.02;

    printf("mode,freq_Hz,Q,tau_s,sigma\n");
    for (int n = 1; n <= MODES; ++n) {
        double f = mode_frequency(n);
        for (int q = 0; q < nQ; ++q) {
            for (int k = 0; k < STEPS; ++k) {
                double tau = tau_max * k / (STEPS - 1);
                printf("%d,%.6f,%.6f,%.6f,%.6f\n", n, f, Qs[q], tau, growth_rate(f, tau, Qs[q]));
            }
        }
    }
    return 0;
}
