<?php

namespace App\Http\Controllers;

use App\Models\Quotes;
use Illuminate\Http\Request;

class QuotesController extends Controller
{
    // GET /api/Quotess
    public function index()
    {
        return response()->json(Quotes::all());
    }

    // POST /api/Quotess
    public function store(Request $request)
    {
        $validated = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'quotation_date' => 'required|date',
            'status' => 'required|in:draft,sended,confirmed,signed,rejected',
            'total_amount' => 'required|numeric',
        ]);

        $Quotes = Quotes::create($validated);
        return response()->json($Quotes, 201);
    }

    // GET /api/Quotess/{id}
    public function show($id)
    {
        $Quotes = Quotes::findOrFail($id);
        return response()->json($Quotes);
    }

    // PUT /api/Quotess/{id}
    public function update(Request $request, $id)
    {
        $Quotes = Quotes::findOrFail($id);

        $validated = $request->validate([
            'client_id' => 'sometimes|exists:clients,id',
            'quotation_date' => 'sometimes|date',
            'status' => 'required|in:draft,sended,confirmed,signed,rejected',
            'total_amount' => 'sometimes|numeric',
        ]);

        $Quotes->update(attributes: $validated);
        return response()->json(data: $Quotes);
    }

    // DELETE /api/Quotess/{id}
    public function destroy($id)
    {
        $Quotes = Quotes::findOrFail($id);
        $Quotes->delete();
        return response()->json(null, 204);
    }
}
