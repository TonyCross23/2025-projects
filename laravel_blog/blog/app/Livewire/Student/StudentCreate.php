<?php
namespace App\Livewire\Student;

use App\Models\Student;
use Livewire\Component;
use session;

class StudentCreate extends Component
{
    public $name    = '';
    public $email   = '';
    public $dob     = '';
    public $gender  = '';
    public $grade   = '';
    public $address = '';

    public function save()
    {
        $this->validate([
            'name'    => "required",
            'email'   => "required|unique:students,email",
            'dob'     => "required",
            'gender'  => "required",
            'grade'   => "required",
            'address' => "required",
        ]);

        $student          = new Student();
        $student->name    = $this->name;
        $student->email   = $this->email;
        $student->dob     = $this->dob;
        $student->gender  = $this->gender;
        $student->grade   = $this->grade;
        $student->address = $this->address;
        $student->save();

        session()->flash('success', "Student crated successfully");
        $this->redirect('/students');
    }

    public function render()
    {
        return view('livewire.student.student-create');
    }
}
