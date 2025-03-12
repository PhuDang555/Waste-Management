<?php

namespace App\Repositories;

use App\Enums\AccountType;
use App\Interfaces\WasteCategoryRepositoryInterface;
use App\Models\District;
use App\Models\Province;
use App\Models\User;
use App\Models\Ward;
use App\Models\WasteDetail;
use App\Models\WasteGroup;
use App\Models\WasteType;

class WasteCategoryRepository implements WasteCategoryRepositoryInterface
{
    public function listWasteGroup()
    {
        $data = WasteGroup::all();
        return $data;
    }
    public function listWasteType(int $wasteGroupId)
    {
        $data = WasteType::where('waste_group_id',$wasteGroupId)->get();

        return $data;
    }
    public function listWasteDetail(int $wasteTypeId)
    {
        $data = WasteDetail::where('waste_type_id', $wasteTypeId)->get();

        return $data;
    }

    public function createWasteGroup(array $data)
    {
        return WasteGroup::create($data);
    }
    public function createWasteType(array $data)
    {
        return WasteType::create($data);
    }
    public function createWasteDetail(array $data)
    {
        return WasteDetail::create($data);
    }

    public function editWasteGroup(array $data,int $id)
    {
        return WasteGroup::where('id', $id)->update($data);
    }
    public function editWasteType(array $data,int $id)
    {
        return WasteType::where('id', $id)->update($data);
    }
    public function editWasteDetail(array $data,int $id)
    {
        return WasteDetail::where('id', $id)->update($data);
    }

    public function deleteWasteGroup(int $id)
    {
        return WasteGroup::where('id', $id)->delete();
    }
    public function deleteWasteType(int $id)
    {
        return WasteType::where('id', $id)->delete();
    }
    public function deleteWasteDetail(int $id)
    {
        return WasteDetail::where('id', $id)->delete();
    }

}
