<?php

namespace App\Interfaces;

interface DataInputRepositoryInterface {
    public function listWasteCollectionManagement(int $id);
    public function listCollectingUnit();
    public function listProcessingUnit();
    public function getWasteCollectionManagementById(int $id);
    public function create(array $data);
    public function edit(array $data,int $id);
    public function delete(int $id);
}
