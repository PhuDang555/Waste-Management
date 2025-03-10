<?php

namespace App\Interfaces;

interface CreateUserRepositoryInterface {
    public function listManageUnit();
    public function listUser();
    public function listProvice();
    public function listDistrict(int $id);
    public function listWard(int $id);
    public function findById(int $id);
    public function create(array $data);
    public function edit(array $data,int $id);
    public function delete(int $id);
}
