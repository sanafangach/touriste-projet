<?php
// app/Http/Requests/ProfilUpdateRequest.php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProfilUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'ville' => 'nullable|string|max:255',
            'bio' => 'nullable|string|max:1000',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ];
    }

    public function messages(): array
    {
        return [
            'image.image' => 'Le fichier doit être une image.',
            'image.mimes' => 'L\'image doit être de type: jpeg, png, jpg, gif.',
            'image.max' => 'L\'image ne doit pas dépasser 2Mo.',
            'ville.max' => 'La ville ne doit pas dépasser 255 caractères.',
            'bio.max' => 'La bio ne doit pas dépasser 1000 caractères.',
        ];
    }
}