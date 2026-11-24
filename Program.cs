// Toy Rayleigh-type growth-rate sweep in C#/.NET.
// Run: dotnet run --project dotnet/ThermoCalc
using System;

const double SpeedOfSound = 343.0;
const double DuctLength = 1.0;
const double Damping = 0.05;
const int Modes = 4;
const int Steps = 200;
double[] heatReleases = { 0.5, 1.0, 1.5 };
const double TauMax = 0.02;

static double ModeFrequency(int n) => n * SpeedOfSound / (2.0 * DuctLength);

static double GrowthRate(double f, double tau, double q) =>
    q * Math.Cos(2.0 * Math.PI * f * tau) - Damping;

Console.WriteLine("mode,freq_Hz,Q,tau_s,sigma");
for (int n = 1; n <= Modes; n++)
{
    double f = ModeFrequency(n);
    foreach (double q in heatReleases)
    {
        for (int k = 0; k < Steps; k++)
        {
            double tau = TauMax * k / (Steps - 1);
            Console.WriteLine(string.Join(",",
                n, f.ToString("F6", System.Globalization.CultureInfo.InvariantCulture),
                q.ToString("F6", System.Globalization.CultureInfo.InvariantCulture),
                tau.ToString("F6", System.Globalization.CultureInfo.InvariantCulture),
                GrowthRate(f, tau, q).ToString("F6", System.Globalization.CultureInfo.InvariantCulture)));
        }
    }
}
