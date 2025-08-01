<?php
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name'       => $this->faker->name(),
            'email'      => $this->faker->unique()->safeEmail(),
            'dob'        => $this->faker->date('Y-m-d'),
            'gender'     => $this->faker->randomElement(['male', 'female']),
            'address'    => $this->faker->address(),
            'grade'      => $this->faker->randomElement(['A', 'B', 'C', 'D', 'F']),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
