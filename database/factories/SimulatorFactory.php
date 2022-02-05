<?php

namespace Database\Factories;

use App\Models\Simulator;
use Illuminate\Database\Eloquent\Factories\Factory;

class SimulatorFactory extends Factory
{
    protected $model = Simulator::class;

    public function definition(): array
    {
    	return [
    	    'cep' => '02206000',
            'valor' => '200',
            'tipo_telhado' => 'fbrocimento'
    	];
    }
}
