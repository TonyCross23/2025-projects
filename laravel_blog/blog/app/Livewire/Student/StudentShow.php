<?php
namespace App\Livewire\Student;

use App\Models\Student;
use Livewire\Component;
use Livewire\WithPagination;

class StudentShow extends Component
{
    use WithPagination;
    public function render()
    {
        $students = Student::orderBy('id', 'desc')->paginate(10);
        return view('livewire.student.student-show', compact('students'));
    }
}
