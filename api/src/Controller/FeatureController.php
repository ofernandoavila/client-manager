<?php

namespace Avilamidia\ClientManager\Controller;

use Avilamidia\ClientManager\Core\Controller;
use Avilamidia\ClientManager\Model\Feature;
use Avilamidia\ClientManager\Model\FeatureAttribute;
use Avilamidia\ClientManager\Model\FeatureItem;
use Avilamidia\ClientManager\Repository\FeatureAttributeRepository;
use Avilamidia\ClientManager\Repository\FeatureItemRepository;
use Avilamidia\ClientManager\Repository\FeatureRepository;

class FeatureController extends Controller {
    private FeatureAttributeRepository $featureAttributeRepository;
    private FeatureItemRepository $featureItemRepository;
    public function __construct() {
        $this->featureAttributeRepository = new FeatureAttributeRepository();
        $this->featureItemRepository = new FeatureItemRepository();
        parent::__construct(new FeatureRepository());
    }

    public function SaveFeature(Feature $feature) {
        return $this->repository->save($feature);
    }

    public function DeleteFeature(Feature $feature) {
        return $this->repository->remove($feature);
    }

    public function GetAllFeatures() {
        $data = [];

        foreach($this->repository->getCollectionBy('parent', null) as $feature) {
            $data[] = $this->GetFullFeatureBySlug($feature->slug);
        }

        return $data;
    }

    public function GetFeatureBySlug(string $slug) {
        return $this->repository->getBy('slug', $slug);
    }

    public function CreateNewFeatureAttribute(FeatureAttribute $attribute) {
        return $this->featureAttributeRepository->save($attribute);
    }

    public function GetAllAttributesFromFeature(Feature $feature) {
        return $this->featureAttributeRepository->getCollectionBy('parent', $feature);
    }

    public function SaveFeatureItem(FeatureItem $item) {
        $item->hashData();

        return $this->featureItemRepository->save($item);
    }

    public function GetFeatureItemsFromFeature(Feature $feature) {
        $data = [];

        foreach($this->featureItemRepository->getCollectionBy('type', $feature) as $featureItem) {
            $featureItem->unHashData();
            $data[] = $featureItem;
        }

        return $data;
    }

    public function GetFullFeatureBySlug(string $slug) {
        $feature = $this->GetFeatureBySlug($slug);

        return $feature;
    }
}