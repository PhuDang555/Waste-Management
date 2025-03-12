<?php

namespace App\Interfaces;

interface WasteCategoryRepositoryInterface {
    public function listWasteGroup();
    public function listWasteType(int $wasteGroupId);
    public function listWasteDetail(int $wasteTypeId);

    public function createWasteGroup(array $data);
    public function createWasteType(array $data);
    public function createWasteDetail(array $data);

    public function editWasteGroup(array $data,int $id);
    public function editWasteType(array $data,int $id);
    public function editWasteDetail(array $data,int $id);

    public function deleteWasteGroup(int $id);
    public function deleteWasteType(int $id);
    public function deleteWasteDetail(int $id);
}
