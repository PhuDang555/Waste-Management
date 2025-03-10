<?php

namespace App\Repositories;

use App\Enums\AccountType;
use App\Interfaces\FeaturePermissionRepositoryInterface;
use App\Models\FeaturePermission;
use App\Models\User;
use App\Models\WasteCollectionMannagement;


class FeaturePermissionRepository implements FeaturePermissionRepositoryInterface
{
    public function listFeaturePermission(int $id)
    {
        $user = User::find($id);

        if($user && $user->permission_id == AccountType::ADMIN){
            $list = FeaturePermission::with('feature')->where('permission_id',$user->permission_id)->get();
        }else if($user && $user->permission_id == AccountType::VAN_HANH){
            $list = FeaturePermission::with('feature')->where('permission_id',$user->permission_id)->get();
        }else{
            $list = FeaturePermission::with('feature')->where('permission_id',$user->permission_id)->get();
        }

        return $list;
    }

    public function findById(int $id)
    {
        $data = FeaturePermission::find($id);

        return $data;
    }
    public function create(array $data)
    {
        return WasteCollectionMannagement::create($data);
    }

    public function edit(array $data, int $id)
    {
        return WasteCollectionMannagement::where('id', $id)->update($data);
    }

    public function delete(int $id)
    {
        return WasteCollectionMannagement::where('id', $id)->delete();
    }

}
