<?php

namespace App\Http\Controllers;

use App\Models\CsServiceSparepart;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CounterServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Dashboard/CounterService/AddDeposit');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(CsServiceSparepart $csServiceSparepart)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CsServiceSparepart $csServiceSparepart)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CsServiceSparepart $csServiceSparepart)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CsServiceSparepart $csServiceSparepart)
    {
        //
    }
}
