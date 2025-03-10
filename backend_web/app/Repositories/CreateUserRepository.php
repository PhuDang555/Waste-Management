<?php

namespace App\Repositories;

use App\Enums\AccountType;
use App\Interfaces\CreateUserRepositoryInterface;
use App\Models\District;
use App\Models\FeaturePermission;
use App\Models\Provice;
use App\Models\User;
use App\Models\Ward;
use App\Models\WasteCollectionMannagement;


class CreateUserRepository implements CreateUserRepositoryInterface
{
    public function listManageUnit()
    {
        $data = User::where('permission_id', AccountType::QUAN_LY)->get();

        return $data;
    }

    public function listUser()
    {
        $data = User::where('permission_id', AccountType::QUAN_LY)->orWhere('permission_id', AccountType::VAN_HANH)->get();

        return $data;
    }
    public function listProvice()
    {
        $data = Provice::all();

        return $data;
    }
    public function listDistrict(int $id)
    {
        $data = District::where('provice_id', $id)->get();

        return $data;
    }
    public function listWard(int $id)
    {
        $data = Ward::where('district_id', $id)->get();

        return $data;
    }
    public function findById(int $id)
    {
        $data = User::findById($id);

        return $data;
    }

    public function create(array $data)
    {
        return User::create($data);
    }

    public function edit(array $data, int $id)
    {
        return User::where('id', $id)->update($data);
    }

    public function delete(int $id)
    {
        return User::where('id', $id)->delete();
    }

}
