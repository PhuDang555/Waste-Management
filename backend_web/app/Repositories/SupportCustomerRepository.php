<?php

namespace App\Repositories;

use App\Enums\StatusType;
use App\Interfaces\SupportCustomerRepositoryInterface;
use App\Models\SupportCustomer;

class SupportCustomerRepository implements SupportCustomerRepositoryInterface
{
    public function listRequest()
    {
        $data = SupportCustomer::where('status', StatusType::AWAITING)->orWhere('status', StatusType::PROCESSING)->get();

        return $data;
    }

    public function listResponse()
    {
        $data = SupportCustomer::where('status', StatusType::PROCESSED)->get();

        return $data;
    }

    public function findById(int $id)
    {
        $data = SupportCustomer::find($id);

        return $data;
    }

    public function create(array $data)
    {
        return SupportCustomer::create($data);
    }

    public function edit(array $data, int $id)
    {
        return SupportCustomer::where('id', $id)->update($data);
    }

    public function delete(int $id)
    {
        return SupportCustomer::where('id', $id)->delete();
    }

}
