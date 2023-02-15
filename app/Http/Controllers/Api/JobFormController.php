<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\JobApplication;
class JobFormController extends Controller
{
    
    public function index()
    {
        $provincia = DB::table("provincia_cr")->get();

        return $provincia;
    }

    public function getCanton($provincia)
    {
       
        $cantones = DB::table("canton_cr")->where('codigo_provincia', $provincia)->get();

        return $cantones;
    }

    public function getDistrito($canton)
    {
        $distritos = DB::table("distrito_cr")->where('codigo_canton', $canton)->get();

        return $distritos;
    }

    public function store(Request $request)
    {
        $data = $request->validated();
        var_dump($request);
        $jobApplication = JobApplication::create($data);

        return response(new UserResource($jobApplication) , 201);
    }

    public function show(User $user)
    {
        return new UserResource($user);
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        if (isset($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        }
        $user->update($data);

        return new UserResource($user);
    }

    public function destroy(User $user)
    {
        $user->delete();

        return response("", 204);
    }
}
