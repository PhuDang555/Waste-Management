<?php

namespace App\Interfaces;

interface SupportCustomerRepositoryInterface {
    public function listRequest();
    public function listResponse();
    public function findById(int $id);
    public function create(array $data);
    public function edit(array $data,int $id);
    public function delete(int $id);
}
