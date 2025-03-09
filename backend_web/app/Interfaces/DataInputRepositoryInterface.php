<?php

namespace App\Interfaces;

interface DataInputRepositoryInterface {
    public function listWasteCollectionManagement(int $id);
    public function listWasteTypes();
    public function listCollectingUnit();
    public function listProcessingUnit();
    public function listWasteOwner();
    public function getWasteCollectionManagementById(int $id);
    public function create(array $data);
    public function edit(array $data,int $id);
    public function delete(int $id);
}
