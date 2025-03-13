<div>
    <div class="flex justify-between mb-3">
        <h1 class="text-3xl">Students</h1>
        <flux:button wire:navigate href="/student/create" variant="primary">Create Student</flux:button>
    </div>
    <div class="w-full">
        <x-message></x-message>
        <table class="w-full border-collapse">
            <thead class="bg-gray-800 text-white">
                <tr>
                    <th class="px-4 py-2 text-left">Name</th>
                    <th class="px-4 py-2 text-left">Email</th>
                    <th class="px-4 py-2 text-left">Gender</th>
                    <th class="px-4 py-2 text-left">Grade</th>
                    <th class="px-4 py-2 text-left">DOB</th>
                    <th class="px-4 py-2 text-left">Action</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($students as $student)
                    <tr class="border-b">
                        <td class="px-4 py-2">{{ $student->name }}</td>
                        <td class="px-4 py-2">{{ $student->email }}</td>
                        <td class="px-4 py-2">{{ ucfirst($student->gender) }}</td>
                        <td class="px-4 py-2">{{ ucfirst($student->grade) }}</td>
                        <td class="px-4 py-2">{{ ucfirst($student->dob) }}</td>
                        <td class="px-4 py-2 flex gap-2">
                            <flux:button size="sm" wire:navigate href="/student/{{ $student->id }}/edit"
                                variant="primary">Edit</flux:button>
                            <flux:button wire:confirm='Are you sure you went to delete'
                                wire:click='delete({{ $student->id }})' size="sm" variant="danger">Delete
                            </flux:button>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
        <div class="mt-3">
            {{ $students->links() }}
        </div>
    </div>

</div>
