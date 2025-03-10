<?php

namespace App\Interfaces;

interface FeaturePermissionRepositoryInterface {
    public function listFeaturePermission(int $id);
    public function findById(int $id);
    public function create(array $data);
    public function edit(array $data,int $id);
    public function delete(int $id);
}
