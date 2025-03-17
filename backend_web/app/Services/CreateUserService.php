<?php

namespace App\Services;

use App\Enums\BlockType;
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

    public function edit(array $data)
    {
        if (isset($data['avatar'])) {
            $imagePath = $data['avatar']->store('images', 'public');
            $data['avatar'] = $imagePath;
        }

        $user = $this->createUserRepository->findById($data['id']);
        return $this->createUserRepository->edit($data,$user->id);
    }

    public function delete(array $data)
    {
        foreach($data as $item){
            $user = $this->createUserRepository->findById($item);

            if($user){
                $this->createUserRepository->delete($user->id);
            }
        }
        return;
    }

    public function block(array $data)
    {
        foreach($data as $item){
            $user = $this->createUserRepository->findById($item);

            if($user){
                if($user->is_blocked === BlockType::BLOCK){
                    $user->is_blocked = BlockType::UNBLOCK;
                    $user->save();
                }else{
                    $user->is_blocked = BlockType::BLOCK;
                    $user->save();
                }
            }
        }

        return;
    }
}
