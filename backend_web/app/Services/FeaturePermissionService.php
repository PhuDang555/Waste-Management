<?php

namespace App\Services;

use App\Repositories\FeaturePermissionRepository;
use Illuminate\Support\Facades\Log;

class FeaturePermissionService
{
    protected $featurePermissionRepository;

    public function __construct(FeaturePermissionRepository $featurePermissionRepository)
    {
        $this->featurePermissionRepository = $featurePermissionRepository;
    }

    public function listFeaturePermission(int $id)
    {
        return $this->featurePermissionRepository->listFeaturePermission($id);
    }

    public function updateListFeaturePermission(array $data)
    {
        foreach($data as $item){
            $feature = $this->featurePermissionRepository->findById($item['id']);

            $feature->is_active = $item['is_active'];
            $feature->save();
        }
    }
    public function create(array $data)
    {
        return $this->featurePermissionRepository->create($data);
    }

    public function edit(array $data, int $id)
    {
        return $this->featurePermissionRepository->edit($data, $id);
    }

    public function delete(int $id)
    {
        return $this->featurePermissionRepository->delete($id);
    }
}
