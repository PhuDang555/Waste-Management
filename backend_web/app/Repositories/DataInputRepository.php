<?php

namespace App\Repositories;

use App\Enums\AccountType;
use App\Enums\UnitType;
use App\Interfaces\DataInputRepositoryInterface;
use App\Models\User;
use App\Models\WasteCollectionMannagement;
use App\Models\WasteCollectionUnit;
use App\Models\WasteType;
use Illuminate\Support\Facades\Log;

class DataInputRepository implements DataInputRepositoryInterface
{
    public function listWasteCollectionManagement(int $id)
    {   
        $user = User::find($id);
        
        if($user && $user->permission_id == AccountType::ADMIN){
            $list = WasteCollectionMannagement::with('wasteType')->get();
        }else{
            $list = WasteCollectionMannagement::with('wasteType')->where('user_id', $id)->get();
        }
        
        return $list;
    }

    public function listWasteTypes()
    {
        return WasteType::all(); // Trả về danh sách loại rác
    }

    public function listCollectingUnit()
    {
        return WasteCollectionUnit::where('unit_type', UnitType::COLLECTING)->get();
    }

    public function listProcessingUnit()
    {
        return WasteCollectionUnit::where('unit_type', UnitType::PROCESSING)->get();
    }

    public function listWasteOwner()
    {
        return User::where('permission_id',AccountType::QUAN_LY)->orWhere('permission_id', AccountType::VAN_HANH)->get();
    }
    public function getWasteCollectionManagementById(int $id)
    {
        $data = WasteCollectionMannagement::with('wasteType')->find($id);

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
