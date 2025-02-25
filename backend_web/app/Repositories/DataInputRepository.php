<?php

namespace App\Repositories;

use App\Enums\UnitType;
use App\Interfaces\DataInputRepositoryInterface;
use App\Models\WasteCollectionMannagement;
use App\Models\WasteCollectionUnit;

class DataInputRepository implements DataInputRepositoryInterface
{
    public function listWasteCollectionManagement(int $id)
    {
        return WasteCollectionMannagement::where('user_id', $id)->get();
    }

    public function listCollectingUnit()
    {
        return WasteCollectionUnit::where('unit_type', UnitType::COLLECTING)->get();
    }

    public function listProcessingUnit()
    {
        return WasteCollectionUnit::where('unit_type', UnitType::PROCESSING)->get();
    }

    public function getWasteCollectionManagementById(int $id)
    {
        return WasteCollectionMannagement::find($id);
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
