-- DropForeignKey
ALTER TABLE `Interaction` DROP FOREIGN KEY `Interaction_leadId_fkey`;

-- DropIndex
DROP INDEX `Interaction_leadId_fkey` ON `Interaction`;

-- AddForeignKey
ALTER TABLE `Interaction` ADD CONSTRAINT `Interaction_leadId_fkey` FOREIGN KEY (`leadId`) REFERENCES `Lead`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
