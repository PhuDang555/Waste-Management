<?php

namespace App\Services;

use App\Repositories\WasteCategoryRepository;

class WasteCategoryService
{
    protected $wasteCategoryRepository;

    public function __construct(WasteCategoryRepository $wasteCategoryRepository)
    {
        $this->wasteCategoryRepository = $wasteCategoryRepository;
    }

    public function listWasteGroup()
    {
        return $this->wasteCategoryRepository->listWasteGroup();
    }

    public function createWasteGroup(array $data)
    {
        return $this->wasteCategoryRepository->createWasteGroup($data);
    }
    public function createWasteType(array $data)
    {
        return $this->wasteCategoryRepository->createWasteType($data);
    }
    public function createWasteDetail(array $data)
    {
        return $this->wasteCategoryRepository->createWasteDetail($data);
    }

    public function editWasteGroup(array $data, int $id)
    {
        return $this->wasteCategoryRepository->editWasteGroup($data,$id);
    }
    public function editWasteType(array $data, int $id)
    {
        return $this->wasteCategoryRepository->editWasteType($data,$id);
    }
    public function editWasteDetail(array $data, int $id)
    {
        return $this->wasteCategoryRepository->editWasteDetail($data,$id);
    }

    public function deleteWasteGroup(int $id)
    {
        $wasteTypeIds = $this->wasteCategoryRepository->listWasteType($id)->pluck('id')->toArray();

        if (!empty($wasteTypeIds)) {

            $this->wasteCategoryRepository->deleteWasteDetailsByTypeIds($wasteTypeIds);

            $this->wasteCategoryRepository->deleteWasteTypesByGroupId($id);
        }

        return $this->wasteCategoryRepository->deleteWasteGroup($id);
    }
    public function deleteWasteType(int $id)
    {
        $data = $this->wasteCategoryRepository->listWasteDetail($id);

        foreach($data as $item){
            $this->wasteCategoryRepository->deleteWasteDetail($item->id);
        }

        return $this->wasteCategoryRepository->deleteWasteType($id);
    }
    public function deleteWasteDetail(int $id)
    {
        return $this->wasteCategoryRepository->deleteWasteDetail($id);
    }
}
