<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class JobApplicationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => 'required',
            'email' => 'required',
            'id' => 'required',
            'dateBirth' => 'required',
            'gender' => 'required',
            'marStatus' => 'required',
            'phone' => 'required',
            'province' => 'required',
            'canton' => 'required',
            'district' => 'required',
            'address' => 'required',
            'photo' => 'required', 
            'video' => 'required',
            'audio' => 'required',
            'engSpeak' => 'required',
            'engWrite' => 'required',
            'compKnowledge' => 'required',
            'aptCou' => 'required',
            'prevCustSerExp' => 'required',
            'prevTechSupportExp' => 'required',
            'prevQaExpRef' => 'required',
            'prevSalesExp' => 'required',
            'prevBackOffExp' => 'required',
            'prevNoneExpRef' => 'required',
            'position' => 'required',
            'relExp' => 'required',
            'salPretension' => 'required'
        ];
    }
}
