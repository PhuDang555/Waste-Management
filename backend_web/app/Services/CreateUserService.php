<?php

namespace App\Services;

use App\Repositories\CreateUserRepository;

class CreateUserService
{
    protected $createUserRepository;

    public function __construct(CreateUserRepository $createUserRepository)
    {
        $this->createUserRepository = $createUserRepository;
    }

    public function listManageUnit()
    {
        return $this->createUserRepository->listManageUnit();
    }

    public function listUser()
    {
        return $this->createUserRepository->listUser();
    }

    public function listProvince()
    {
        return $this->createUserRepository->listProvince();
    }
    public function listDistrict(int $id)
    {
        return $this->createUserRepository->listDistrict($id);
    }
    public function listWard(int $id)
    {
        return $this->createUserRepository->listWard($id);
    }

    public function findById(int $id)
    {
        return $this->createUserRepository->findById($id);
    }

    public function create(array $data)
    {
        if (isset($data['avatar'])) {
            $imagePath = $data['avatar']->store('images', 'public');
            $data['avatar'] = $imagePath;
        }

        return $this->createUserRepository->create($data);
    }

    public function edit(array $data, int $id)
    {
        if (isset($data['avatar'])) {
            $imagePath = $data['avatar']->store('images', 'public');
            $data['avatar'] = $imagePath;
        }

        return $this->createUserRepository->edit($data, $id);
    }

    public function delete(int $id)
    {
        return $this->createUserRepository->delete($id);
    }
}
