# Generated by Django 5.1.7 on 2025-03-31 06:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='deployment',
            name='status',
        ),
        migrations.AddField(
            model_name='deployment',
            name='branch',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='deployment',
            name='name',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='deployment',
            name='publishDir',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='deployment',
            name='service_url',
            field=models.URLField(blank=True, null=True),
        ),
    ]
