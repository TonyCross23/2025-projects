<?php
namespace App\Livewire\Student;

use App\Models\Student;
use Livewire\Component;
use Livewire\WithPagination;
use session;

class StudentShow extends Component
{
    use WithPagination;

    public function delete($id)
    {
        $student = Student::find($id);
        $student->delete();
        session()->flash('success', "Student deleted succefully");

        return $this->redirect("/students");
    }

    public function render()
    {
        $students = Student::orderBy('id', 'desc')->paginate(10);
        return view('livewire.student.student-show', compact('students'));
    }
}
