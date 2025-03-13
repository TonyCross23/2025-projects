<?php
namespace App\Livewire\Student;

use App\Models\Student;
use Livewire\Component;

class StudentEdit extends Component
{
    public $name;
    public $email;
    public $dob;
    public $gender;
    public $grade;
    public $address;
    public $id;
    public function mount($id)
    {
        $student       = Student::findOrFail($id);
        $this->name    = $student->name;
        $this->email   = $student->email;
        $this->dob     = $student->dob;
        $this->gender  = $student->gender;
        $this->grade   = $student->grade;
        $this->address = $student->address;
        $this->id      = $id;

    }

    public function update()
    {
        $this->validate([
            'name'    => "required",
            'email'   => "required",
            'dob'     => "required",
            'gender'  => "required",
            'grade'   => "required",
            'address' => "required",
        ]);

        $student          = Student::find($this->id);
        $student->name    = $this->name;
        $student->email   = $this->email;
        $student->dob     = $this->dob;
        $student->gender  = $this->gender;
        $student->grade   = $this->grade;
        $student->address = $this->address;
        $student->save();

        session()->flash('success', "Student updated successfully");
        $this->redirect('/students');

    }

    public function render()
    {
        return view('livewire.student.student-edit');
    }
}
