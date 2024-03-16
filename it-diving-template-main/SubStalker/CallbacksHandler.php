<?php

namespace SubStalker;

use VK\CallbackApi\VKCallbackApiHandler;

class CallbacksHandler extends VKCallbackApiHandler {
  private $vk;
    private $access_token;

    public function __construct(VKApiClient $vk, string $access_token) {
        $this->vk = $vk;
        $this->access_token = $access_token;
    }

    public function groupLeave(int $group_id, ?string $secret, array $object) {
        $user_id = $object['user_id'];
        // Отправляем сообщение пользователю
        $this->vk->messages()->send($this->access_token, [
            'user_id' => $user_id,
            'message' => 'Вы покинули сообщество.'
        ]);
    }

    public function groupJoin(int $group_id, ?string $secret, array $object) {
        $user_id = $object['user_id'];
        // Отправляем сообщение пользователю
        $this->vk->messages()->send($this->access_token, [
            'user_id' => $user_id,
            'message' => 'Вы присоединились к сообществу.'
        ]);
    }
}
