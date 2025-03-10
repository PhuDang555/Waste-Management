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

    public function listProvice()
    {
        return $this->createUserRepository->listProvice();
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
        return $this->createUserRepository->create($data);
    }

    public function edit(array $data, int $id)
    {
        return $this->createUserRepository->edit($data, $id);
    }

    public function delete(int $id)
    {
        return $this->createUserRepository->delete($id);
    }
}
