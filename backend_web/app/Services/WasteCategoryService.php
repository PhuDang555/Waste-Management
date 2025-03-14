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

    public function listWasteType(int $wasteGroupId)
    {
        return $this->wasteCategoryRepository->listWasteType($wasteGroupId);
    }

    public function listWasteDetail(int $wasteTypeId)
    {
        return $this->wasteCategoryRepository->listWasteDetail($wasteTypeId);
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
        return $this->wasteCategoryRepository->deleteWasteGroup($id);
    }
    public function deleteWasteType(int $id)
    {
        return $this->wasteCategoryRepository->deleteWasteType($id);
    }
    public function deleteWasteDetail(int $id)
    {
        return $this->wasteCategoryRepository->deleteWasteDetail($id);
    }
}
