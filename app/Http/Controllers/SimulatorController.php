<?php

namespace App\Http\Controllers;

use App\Models\Simulator;
use Illuminate\Http\Request;

class SimulatorController extends Controller
{
    public function index() 
    {
        return Simulator::all();
    }

    public function store(Request $request) 
    {
        try {
            $simulator = new Simulator();
            $simulator->cep = $request->cep;
            $simulator->valor = $request->valor;
            $simulator->tipo_telhado = $request->tipo_telhado;

            if ($simulator->save()) {
                return response()->json(['status' => 'success', 'message' => 'Simulator inserted']);
            }
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }

}
