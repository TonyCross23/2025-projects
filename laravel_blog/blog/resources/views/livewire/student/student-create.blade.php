<div>
    <div class="flex justify-between mb-6">
        <h1 class="text-3xl">Students / Create</h1>
        <flux:button wire:navigate href="/students" variant="primary">Back</flux:button>
    </div>
    <form wire:submit='save'>
        <flux:field class="mb-3">
            <flux:label>Name</flux:label>
            <flux:input wire:model="name" type="text" />
            <flux:error name="name" />
        </flux:field>
        <flux:field class="mb-3">
            <flux:label>Email</flux:label>
            <flux:input wire:model="email" type="email" />
            <flux:error name="email" />
        </flux:field>
        <flux:field class="mb-3">
            <flux:label>Dob</flux:label>
            <flux:input wire:model="dob" type="date" />
            <flux:error name="dob" />
        </flux:field>
        <flux:field class="mb-3">
            <flux:label>Address</flux:label>
            <flux:textarea wire:model="address" />
            <flux:error name="address" />
        </flux:field>
        <flux:field class="mb-6">
            <flux:label>Grade</flux:label>
            <flux:input wire:model="grade" type="text" />
            <flux:error name="grade" />
        </flux:field>

        <flux:select wire:model="gender" placeholder="Choose Gender">
            <flux:select.option value="male">Male</flux:select.option>
            <flux:select.option value="female">Female</flux:select.option>
        </flux:select>
        <flux:button type="submit" variant="primary" class="mt-5">Save</flux:button>
    </form>
</div>
