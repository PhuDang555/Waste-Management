<?php

namespace App\Services;

use App\Repositories\supportCustomerRepository;

class SupportCustomerService
{
    protected $supportCustomerRepository;

    public function __construct(SupportCustomerRepository $supportCustomerRepository)
    {
        $this->supportCustomerRepository = $supportCustomerRepository;
    }

    public function listRequest()
    {
        return $this->supportCustomerRepository->listRequest();
    }

    public function listResponse()
    {
        return $this->supportCustomerRepository->listResponse();
    }

    public function findById(int $id)
    {
        return $this->supportCustomerRepository->findById($id);
    }

    public function create(array $data)
    {
        return $this->supportCustomerRepository->create($data);
    }

    public function edit(array $data, int $id)
    {

        return $this->supportCustomerRepository->edit($data, $id);
    }

    public function delete(int $id)
    {
        return $this->supportCustomerRepository->delete($id);
    }
}
