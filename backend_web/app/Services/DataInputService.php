<?php

namespace App\Services;

use App\Interfaces\DataInputRepositoryInterface;

class DataInputService
{
    protected $dataInputRepository;

    public function __construct(DataInputRepositoryInterface $dataInputRepository)
    {
        $this->dataInputRepository = $dataInputRepository;
    }

    public function listWasteTypes()
    {
        return $this->dataInputRepository->listWasteTypes();
    }

    public function listWasteCollectionManagement(int $id)
    {
        return $this->dataInputRepository->listWasteCollectionManagement($id);
    }

    public function listCollectingUnit()
    {
        return $this->dataInputRepository->listCollectingUnit();
    }

    public function listProcessingUnit()
    {
        return $this->dataInputRepository->listProcessingUnit();
    }

    public function getWasteCollectionManagementById(int $id)
    {
        return $this->dataInputRepository->getWasteCollectionManagementById($id);
    }

    public function create(array $data)
    {
        if (isset($data['image'])) {
            $imagePath = $data['image']->store('images', 'public');
            $data['image_path'] = $imagePath;
            unset($data['image']);
        }

        return $this->dataInputRepository->create($data);
    }

    public function edit(array $data, int $id)
    {
        if (isset($data['image'])) {
            $imagePath = $data['image']->store('images', 'public');
            $data['image_path'] = $imagePath;
            unset($data['image']);
        }
        
        return $this->dataInputRepository->edit($data, $id);
    }

    public function delete(int $id)
    {
        return $this->dataInputRepository->delete($id);
    }
}
