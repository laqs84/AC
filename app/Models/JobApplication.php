<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobApplication extends Model
{
    use HasFactory;

    protected $table = 'jobApplicationForm';

    public $name;
    public $id;
    public $dateBirth;
    public $gender;
    public $marStatus;
    public $email;
    public $phone;
    public $province;
    public $canton;
    public $district;
    public $address;
    public $photo; 
    public $video;
    public $audio;
    public $engSpeak;
    public $engWrite;
    public $compKnowledge;
    public $aptCou;
    public $prevCustSerExp;
    public $prevTechSupportExp;
    public $prevQaExpRef;
    public $prevSalesExp;
    public $prevBackOffExp;
    public $prevNoneExpRef;
    public $position;
    public $relExp;
    public $salPretension;

}
